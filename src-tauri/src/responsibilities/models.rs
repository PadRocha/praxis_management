use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Device {
    pub so: String,
    pub ram: String,
    pub programs: Vec<ObjectId>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Responsibility {
    pub equipment: String,
    pub dn: String,
    pub client: String,
    pub manager: String,
    pub project: String,
    pub status: String,
    pub device: Device,
}
