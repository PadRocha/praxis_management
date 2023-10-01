use super::User;
use mongodb::{
    bson::{doc, to_document, DateTime, Document},
    options::FindOneOptions,
    results::InsertOneResult,
    Database,
};

#[tauri::command]
pub async fn create_user(
    db: tauri::State<'_, Database>,
    document: User,
) -> Result<InsertOneResult, String> {
    let collection = db.collection::<Document>("users");
    let mut doc = to_document(&document).unwrap();
    let timestamp = doc! {
      "created_at": DateTime::now(),
      "updated_at": DateTime::now(),
    };
    doc.extend(timestamp);
    let options = mongodb::options::InsertOneOptions::builder().build();
    if let Ok(result) = collection.insert_one(doc, options).await {
        Ok(result)
    } else {
        Err("Couldnt create user".into())
    }
}

#[tauri::command]
pub async fn login_user(db: tauri::State<'_, Database>, document: User) -> Result<User, String> {
    let collection = db.collection::<User>("users");
    let filter = to_document(&document).unwrap();
    let projection = doc! { "_id": 1i32 , "name": 1  };
    let options = FindOneOptions::builder().projection(projection).build();
    let user = collection.find_one(filter, options).await.unwrap();
    if let Some(data) = user {
        Ok(data)
    } else {
        Err("Document not exists".into())
    }
}

#[tauri::command]
pub async fn get_user(db: tauri::State<'_, Database>, _id: String) -> Result<User, String> {
    let collection = db.collection::<User>("users");
    let filter = doc! {"_id": _id};
    let projection = doc! { "_id": 1i32 , "name": 1  };
    let options = FindOneOptions::builder().projection(projection).build();
    let user = collection.find_one(filter, options).await.unwrap();
    if let Some(data) = user {
        Ok(data)
    } else {
        Err("Document not exists".into())
    }
}
