// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use mongodb::{
    bson::{doc, Document},
    options::{ClientOptions, FindOneOptions},
    Client,
};

#[tauri::command]
async fn login(
    client: tauri::State<'_, Client>,
    nickname: String,
    password: String,
) -> Result<Document, String> {
    let db = client.default_database().unwrap();
    let target_collection = db.collection::<Document>("users");

    let filter = doc! { "name": nickname, "password": password };
    let projection = doc! { "name": 1, "_id": 1 };
    let options = FindOneOptions::builder().projection(projection).build();
    let user = match target_collection.find_one(filter, options).await {
        Ok(doc) => doc,
        _ => None,
    };
    if let Some(data) = user {
        Ok(data)
    } else {
        Err("No user".into())
    }
}

#[tauri::command]
async fn user(client: tauri::State<'_, Client>, _id: String) -> Result<Document, String> {
    let db = client.default_database().unwrap();
    let target_collection = db.collection::<Document>("users");

    let filter = doc! { "_id": _id };
    let projection = doc! { "name":1, "_id": 1 };
    let options = FindOneOptions::builder().projection(projection).build();
    let user = match target_collection.find_one(filter, options).await {
        Ok(doc) => doc,
        _ => None,
    };
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
        .invoke_handler(tauri::generate_handler![login, user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
