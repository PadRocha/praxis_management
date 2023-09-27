// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use mongodb::{
    bson::{doc, Document},
    options::{ClientOptions, FindOneOptions},
    Client,
};

// create the error type that represents all errors possible in our program
#[derive(Debug, thiserror::Error)]
enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
}

// we must manually implement serde::Serialize
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn login(client: tauri::State<'_, Client>, nickname: String) -> Result<Document, String> {
    let db = client.default_database().unwrap();
    let target_collection = db.collection::<Document>("users");
    let user = target_collection
        .find_one(doc! { "name": nickname }, FindOneOptions::default())
        .await
        .unwrap();
    if let Some(data) = user {
        Ok(data)
    } else {
        Err("No user".into())
    }
}

fn main() {
    let db_url = "mongodb://localhost:27017/praxis";
    let options = ClientOptions::parse(db_url).expect("invalid database url");
    let client = Client::with_options(options).unwrap();

    tauri::Builder::default()
        .manage(client)
        .invoke_handler(tauri::generate_handler![greet, login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
