use crate::models::Project;
use mongodb::{options::InsertOneOptions, results::InsertOneResult, Database};
use tauri::State;

/// # Crear responsiva
/// Función para crear un nuevo documento en la bd "responsive_letters"
#[tauri::command]
pub async fn create_project(
    db: State<'_, Database>,
    doc: Project,
) -> Result<InsertOneResult, &str> {
    let coll = db.collection::<Project>("projects");
    let options = InsertOneOptions::builder().build();
    match coll.insert_one(doc, options).await {
        Ok(result) => Ok(result),
        Err(_) => Err("Couldnt create Doc"),
    }
}
