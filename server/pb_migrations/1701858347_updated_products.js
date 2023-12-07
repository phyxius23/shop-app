/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rakw4zfmk14fmgz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "psyrbnzi",
    "name": "console",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "PS4",
        "PS5",
        "Xbox One"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rakw4zfmk14fmgz")

  // remove
  collection.schema.removeField("psyrbnzi")

  return dao.saveCollection(collection)
})
