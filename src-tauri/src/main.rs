// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use controllers::{
    create_inventory, create_responsibility, create_software, create_user, get_user, login_user,
};
use dotenv::dotenv;
use mongodb::{options::ClientOptions, Client, Database};
use std::env::var;
use tauri::{generate_context, generate_handler, Builder};
use tokio::runtime::Runtime;

mod controllers;
mod models;

async fn config_db(client: &Client) -> Result<Database, ()> {
    let db = client.database("praxis");
    let _ = db.create_collection("users", None).await;
    let _ = db.create_collection("responsibilities", None).await;
    let _ = db.create_collection("inventories", None).await;
    let _ = db.create_collection("softwares", None).await;
    Ok(db)
}

fn main() {
    dotenv().ok();
    let db_url = var("mongodb").expect("mongodb must be set.");
    let options = ClientOptions::parse(db_url).expect("invalid database url");
    let client = Client::with_options(options).unwrap();
    let rt = Runtime::new().unwrap();
    let db = rt.block_on(config_db(&client)).unwrap();
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
        .run(generate_context!())
        .expect("error while running tauri application");
}
