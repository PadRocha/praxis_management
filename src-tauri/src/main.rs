// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenv::dotenv;
use mongodb::{options::ClientOptions, Client};
use responsibilities::create_responsibility;
use std::env::var;
use users::{create_user, get_user, login_user};

mod responsibilities;
mod users;

fn main() {
    dotenv().ok();
    let db_url = var("mongodb").expect("mongodb must be set.");
    let options = ClientOptions::parse(db_url).expect("invalid database url");
    let client = Client::with_options(options).unwrap();
    let db = client.database("praxis");

    tauri::Builder::default()
        .manage(db)
        .invoke_handler(tauri::generate_handler![
            create_responsibility,
            create_user,
            get_user,
            login_user,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
