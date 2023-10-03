use crate::models::Software;
use mongodb::{
    bson::{doc, to_document, Document},
    options::InsertOneOptions,
    results::InsertOneResult,
    Database,
};

/// # Crear responsiva
/// Función para crear un nuevo documento en la bd "software"
#[tauri::command]
pub async fn create_software(
    db: tauri::State<'_, Database>,
    doc: Software,
) -> Result<InsertOneResult, String> {
    let collection = db.collection::<Document>("softwares");
    let document = to_document(&doc).unwrap();
    let options = InsertOneOptions::builder().build();
    if let Ok(result) = collection.insert_one(document, options).await {
        Ok(result)
    } else {
        Err("Couldnt create user".into())
    }
}
