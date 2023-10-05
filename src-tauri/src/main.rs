// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use controllers::{
    create_inventory, create_responsibility, create_software, create_user, get_user, login_user,
};
use dotenv::dotenv;
use mongodb::{options::ClientOptions, Client};
use std::env::var;
use tauri::{generate_handler, Builder};

mod controllers;
mod models;

fn main() {
    dotenv().ok();
    let db_url = var("mongodb").expect("mongodb must be set.");
    let options = ClientOptions::parse(db_url).expect("invalid database url");
    let client = Client::with_options(options).unwrap();
    let db = client.database("praxis");
    Builder::default()
        .manage(db)
        .invoke_handler(generate_handler![
            create_inventory,
            create_responsibility,
            create_software,
            create_user,
            get_user,
            login_user,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
