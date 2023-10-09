use crate::models::Responsibility;
use mongodb::{
    bson::{doc, to_document, Document},
    options::InsertOneOptions,
    results::InsertOneResult,
    Database,
};
use tauri::State;

/// # Crear responsiva
/// Función para crear un nuevo documento en la bd "responsibilities"
#[tauri::command]
pub async fn create_responsibility(
    db: State<'_, Database>,
    doc: Responsibility,
) -> Result<InsertOneResult, String> {
    let collection = db.collection::<Document>("responsibilities");
    let document = to_document(&doc).unwrap();
    let options = InsertOneOptions::builder().build();
    if let Ok(result) = collection.insert_one(document, options).await {
        Ok(result)
    } else {
        Err("Couldnt create user".into())
    }
}
