// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::config_db::config_db;
use controllers::{
    create_hardware, create_inventory, create_project, create_responsive_letter, create_software,
    create_user, get_user, login_user,
};
use dotenv::dotenv;
use mongodb::{options::ClientOptions, Client};
use std::env;
use tauri::{generate_context, generate_handler, Builder};
use tokio::runtime::Runtime;

mod config_db;
mod controllers;
mod models;

fn main() {
    dotenv().ok();
    let db_url = env::var("mongodb").expect("mongodb must be set.");
    let options = ClientOptions::parse(db_url).expect("invalid database url");
    let client = Client::with_options(options).unwrap();
    let rt = Runtime::new().unwrap();
    let db = rt.block_on(config_db(&client)).unwrap();
    Builder::default()
        .manage(db)
        .invoke_handler(generate_handler![
            create_hardware,
            create_inventory,
            create_project,
            create_responsive_letter,
            create_software,
            create_user,
            get_user,
            login_user,
        ])
        .run(generate_context!())
        .expect("error while running tauri application");
}
