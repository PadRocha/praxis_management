use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Program {
    software: ObjectId,
    unit: u8,
    monthly: bool,
}

/// # Device
/// Estructura del dispositivo
#[derive(Debug, Serialize, Deserialize)]
pub struct Device {
    //// Tipo de dispositivo
    pub hardware: ObjectId,
    /// ID del que hizo la responsiva
    pub modified_by: String,
    /// Sistema operativo
    #[serde(skip_serializing_if = "Option::is_none")]
    pub so: Option<ObjectId>,
    /// RAM
    #[serde(skip_serializing_if = "Option::is_none")]
    pub ram: Option<Vec<ObjectId>>,
    /// Disco duro
    #[serde(skip_serializing_if = "Option::is_none")]
    pub hard_drive: Option<String>,

    // /// Procesador
    // #[serde(skip_serializing_if = "Option::is_none")]
    // pub processor: Option<String>,
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
    /// Programas (softwares)
    #[serde(skip_serializing_if = "Option::is_none")]
    pub programs: Option<Vec<Program>>,
    /// Anexos
    #[serde(skip_serializing_if = "Option::is_none")]
    pub extras: Option<Vec<ObjectId>>,
}

/// # Responsibility
/// Estructura de las responsivas
#[derive(Debug, Serialize, Deserialize)]
pub struct ResponsiveLetter {
    /// ID equipo [u8; 9]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub equipment: Option<String>,

    // /// DN
    // pub udn: String,
    // /// Cliente
    // pub client: String,
    // /// Proyecto
    // pub project: String,
    /// Clave de proyecto
    pub project_key: ObjectId,

    /// Gerente
    pub manager: String,
    /// Id recurso
    pub id_resource: String,
    /// Nombre del recurso
    pub resource_name: String,
    /// Permisos
    pub permissions: bool,
    /// Fecha de entrega
    delivery_date: String,
    // /// Ubicación de entrega
    pub delivery_location: String,
    // /// Fecha de devolución
    #[serde(skip_serializing_if = "Option::is_none")]
    pub return_date: Option<String>,
    // /// Ubicación de devolución
    #[serde(skip_serializing_if = "Option::is_none")]
    pub return_location: Option<String>,
    /// Estado de responsiva
    pub status: String,
    /// Razón Social
    pub company_name: String,
    /// Enviado
    pub envoy: bool,
    /// Información del dispositivo
    pub device: Device,
}
