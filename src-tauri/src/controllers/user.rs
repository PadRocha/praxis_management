use crate::models::User;
use mongodb::{
    bson::doc,
    options::{FindOneOptions, InsertOneOptions},
    results::InsertOneResult,
    Database,
};
use tauri::State;

/// Regresa el id del elemento creado
///
/// ## Argumentos
///
/// * `db` - State de la base de datos
/// * `document` - Objeto tipo `User`
///     * `name` - El nombre del usuario
///     * `pass` - La contraseña a encriptar
///     * `roles` - Arreglo de caracteres que denominan roles
///
/// ## Ejemplo de respuesta
///
/// ```
/// InsertOneResult {
///     inserted_id: "651f43a94cc9d5d2b2295253"
/// }
/// ```
#[tauri::command]
pub async fn create_user(db: State<'_, Database>, document: User) -> Result<InsertOneResult, &str> {
    let mut doc = document;
    doc.hash_pass();
    doc.timestamp();
    let coll = db.collection::<User>("users");
    let options = InsertOneOptions::builder().build();
    match coll.insert_one(doc, options).await {
        Ok(result) => Ok(result),
        Err(_) => Err("Couldnt create User"),
    }
}

/// Regresa el documento de un usuario
///
/// ## Argumentos
///
/// * `db` - State de la base de datos
/// * `document` - Objeto tipo `User`
///     * `name` - El nombre del usuario
///     * `pass` - La contraseña para comparar
///
/// ## Ejemplo de respuesta
///
/// ```
/// User {
///     _id: {
///         &oid: "651f43a94cc9d5d2b2295253"
///     },
///     name: "padrocha",
///     pass: "$2b$10$VXVSlA17rzLqZgRUTe...",
///     roles: ['r', 'w']
/// }
/// ```
#[tauri::command]
pub async fn login_user(db: State<'_, Database>, document: User) -> Result<User, &str> {
    let collection = db.collection::<User>("users");
    let name = document.name;
    let filter: mongodb::bson::Document = doc! { "name": name };
    let projection = doc! { "_id": 1, "name": 1, "pass": 1, "roles": 1 };
    let options = FindOneOptions::builder().projection(projection).build();
    match collection.find_one(filter, options).await.unwrap() {
        Some(mut user) => match user.verify(document.pass) {
            true => Ok(user),
            false => Err("Invalid password".into()),
        },
        _ => Err("User not exists"),
    }
}

/// Regresa un documento de usuario
///
/// ## Argumentos
///
/// * `db` - State de la base de datos
/// * `_id` - String del id del usuario
///
/// ## Ejemplo de respuesta
///
/// ```
/// User {
///     _id: {
///         &oid: "651f43a94cc9d5d2b2295253"
///     },
///     name: "padrocha",
/// }
/// ```
#[tauri::command]
pub async fn get_user(db: State<'_, Database>, id: String) -> Result<User, &str> {
    let collection = db.collection::<User>("users");
    let filter = doc! { "_id": id };
    let projection = doc! { "_id": 1i32 , "name": 1  };
    let options = FindOneOptions::builder().projection(projection).build();
    match collection.find_one(filter, options).await.unwrap() {
        Some(user) => Ok(user),
        _ => Err("Document not exists"),
    }
}
