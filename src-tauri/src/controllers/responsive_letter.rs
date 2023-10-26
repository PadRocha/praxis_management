use crate::models::ResponsiveLetter;
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
<<<<<<< HEAD:src-tauri/src/controllers/responsive_letter.rs
    doc: ResponsiveLetter,
=======
    doc: Responsibility,
>>>>>>> 55030bb7b52095c9eedf8c505b9cfcc484ea2aec:src-tauri/src/controllers/responsibility.rs
) -> Result<InsertOneResult, &str> {
    let collection = db.collection::<Document>("responsibilities");
    let document = to_document(&doc).unwrap();
    let options = InsertOneOptions::builder().build();
    if let Ok(result) = collection.insert_one(document, options).await {
        Ok(result)
    } else {
        Err("Couldnt create user")
    }
}
