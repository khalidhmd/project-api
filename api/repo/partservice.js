const PartserviceModel = require('../models/product');

const savePartservice = async (gov) => {
  const result = await GovModel.create(gov);
  return result;
}

const addZone = async (gov, zone) => {
  gov.zones.push(zone);
  const result = await gov.save();
  return result;
}

const findGov = async (id) => {
  const result = await GovModel.findById(id);
  return result;
}

const deleteZone = async (govId, zone) => {
  const gov = await GovModel.findById(govId)
  gov.zones.splice(gov.zones.indexOf(zone),1);
  const result = await gov.save();
  return result;
}

const deleteGov = async (id) => {
  await GovModel.findByIdAndRemove(id);
}

module.exports.saveGov = saveGov;
module.exports.findGov = findGov;
module.exports.addZone = addZone;
module.exports.deleteZone = deleteZone;
module.exports.deleteGov = deleteGov;