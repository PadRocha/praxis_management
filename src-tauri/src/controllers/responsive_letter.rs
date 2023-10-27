use crate::models::ResponsiveLetter;
use mongodb::{
    bson::{doc, to_document, Document},
    options::InsertOneOptions,
    results::InsertOneResult,
    Database,
};
use tauri::State;

/// # Crear responsiva
/// Función para crear un nuevo documento en la bd "responsive_letters"
#[tauri::command]
pub async fn create_responsive_letter(
    db: State<'_, Database>,
    doc: ResponsiveLetter,
) -> Result<InsertOneResult, &str> {
    let collection = db.collection::<Document>("responsive_letters");
    let document = to_document(&doc).unwrap();
    let options = InsertOneOptions::builder().build();
    if let Ok(result) = collection.insert_one(document, options).await {
        Ok(result)
    } else {
        Err("Couldnt create user")
    }
}
