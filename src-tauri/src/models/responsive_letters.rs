use mongodb::bson::{oid::ObjectId, DateTime};
use serde::{Deserialize, Serialize};

/// # Device
/// Estructura del dispositivo
#[derive(Debug, Serialize, Deserialize)]
pub struct Device {
    //// Tipo de dispositivo
    pub device_type: String,
    /// Sistema operativo
    #[serde(skip_serializing_if = "Option::is_none")]
    pub so: Option<String>,
    /// RAM
    #[serde(skip_serializing_if = "Option::is_none")]
    pub ram: Option<String>,
    /// Disco duro
    #[serde(skip_serializing_if = "Option::is_none")]
    pub hard_drive: Option<String>,
    /// Procesador
    #[serde(skip_serializing_if = "Option::is_none")]
    pub processor: Option<String>,
    /// Marca
    #[serde(skip_serializing_if = "Option::is_none")]
    pub brand: Option<String>,
    /// Modelo
    #[serde(skip_serializing_if = "Option::is_none")]
    pub model: Option<String>,
    /// Número de serie
    #[serde(skip_serializing_if = "Option::is_none")]
    pub serial_number: Option<String>,
    /// Notas sobre máquina
    #[serde(skip_serializing_if = "Option::is_none")]
    pub notes: Option<String>,
    /// ID del que hizo la responsiva
    pub modified_by: String,
    /// Programas (softwares)
    #[serde(skip_serializing_if = "Option::is_none")]
    pub programs: Option<Vec<ObjectId>>,
    /// Anexos
    #[serde(skip_serializing_if = "Option::is_none")]
    pub extras: Option<Vec<ObjectId>>,
}

/// # Responsibility
/// Estructura de las responsivas
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponsiveLetter {
    /// ID equipo [u8; 9]
    pub equipment: String,

    // /// DN
    // pub udn: String,
    // /// Cliente
    // pub client: String,
    // /// Proyecto
    // pub project: String,
    /// Clave de proyecto
    pub proyect_key: String,

    /// Gerente
    pub manager: String,
    /// Id recurso
    pub id_resource: String,
    /// Nombre del recurso
    pub resource_name: String,
    /// Permisos
    pub permissions: bool,
    /// Fecha de entrega
    pub delivery_date: DateTime,
    /// Ubicación de entrega
    pub delivery_location: String,
    /// Fecha de devolución
    pub return_date: DateTime,
    /// Ubicación de devolución
    pub return_location: String,
    /// Estado de responsiva
    pub status: String,
    /// Razón Social
    pub company_name: String,
    /// Enviado
    pub envoy: bool,
    /// Información del dispositivo
    pub device: Device,
}
