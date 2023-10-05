use std::collections::HashMap;

use crate::models::User;
use mongodb::{
    bson::doc,
    options::{FindOneOptions, InsertOneOptions},
    results::InsertOneResult,
    Database,
};
use tauri::State;

#[tauri::command]
pub async fn create_user(
    db: State<'_, Database>,
    document: User,
) -> Result<InsertOneResult, String> {
    let mut doc = document;
    doc.hash_pass();
    doc.timestamp();
    let coll = db.collection::<User>("users");
    let options = InsertOneOptions::builder().build();
    match coll.insert_one(doc, options).await {
        Ok(result) => Ok(result),
        Err(_) => Err("Couldnt create User".into()),
    }
}

#[tauri::command]
pub async fn login_user(
    db: tauri::State<'_, Database>,
    // permissions: tauri::State<'_, HashMap<String, u8>>,
    document: User,
) -> Result<User, String> {
    let collection = db.collection::<User>("users");
    let name = document.name;
    let filter: mongodb::bson::Document = doc! { "name": name };
    let projection = doc! { "_id": 1, "name": 1, "pass": 1, "roles": 1 };
    let options = FindOneOptions::builder().projection(projection).build();
    let doc = collection.find_one(filter, options).await.unwrap();
    if let Some(mut user) = doc {
        match user.verify(document.pass) {
            true => Ok(user),
            false => Err("Invalid password".into()),
        }
    } else {
        Err("User not exists".into())
    }
}

#[tauri::command]
pub async fn get_user(db: tauri::State<'_, Database>, _id: String) -> Result<User, String> {
    let collection = db.collection::<User>("users");
    let filter = doc! { "_id": _id};
    let projection = doc! { "_id": 1i32 , "name": 1  };
    let options = FindOneOptions::builder().projection(projection).build();
    let user = collection.find_one(filter, options).await.unwrap();
    if let Some(data) = user {
        Ok(data)
    } else {
        Err("Document not exists".into())
    }
}
