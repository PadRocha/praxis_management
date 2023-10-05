use mongodb::bson::{oid::ObjectId, DateTime};
use pwhash::bcrypt;
use serde::{Deserialize, Serialize};

/// # User
/// Estructura de usuario
#[derive(Debug, Serialize, Deserialize, Default)]
pub struct User {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub _id: Option<ObjectId>,
    pub name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub pass: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub roles: Option<Vec<char>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created_at: Option<DateTime>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updated_at: Option<DateTime>,
}

impl User {
    /// Convierte la propiedad "pass" de User en un Hash
    pub fn hash_pass(&mut self) {
        if let Some(pass) = &self.pass {
            match bcrypt::hash(pass) {
                Ok(encrypt) => {
                    self.pass = Some(encrypt);
                }
                Err(_) => panic!("On no"),
            }
        }
    }

    /// Comprueba que el hash coincide con una clave
    pub fn verify(&mut self, pass: Option<String>) -> bool {
        if pass == None {
            return false;
        }
        if let Some(password) = &self.pass {
            bcrypt::verify(pass.unwrap(), password)
        } else {
            false
        }
    }

    /// Setea una fecha de creado y actualizado
    pub fn timestamp(&mut self) {
        if self.created_at == None {
            self.created_at = Some(DateTime::now());
        }
        if self.updated_at == None {
            self.updated_at = Some(DateTime::now());
        }
    }
}
