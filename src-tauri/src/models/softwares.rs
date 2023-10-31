use serde::{Deserialize, Serialize};

/// # Device
/// Estructura del dispositivo
#[derive(Debug, Serialize, Deserialize)]
pub struct Software {
    /// Nombre de programa
    pub name: String,
    /// Precio de progama
    pub price: f64,
    /// Tipo de programa
    /// Ejemplos: so, Office, Antivirus, Project, Visual Studio, Visio, Otros...
    pub kind: String,
}
