import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'worlds'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      // name, description, gaming_system, privacy, owner_id, genre, tags
      table.string('name').notNullable()
      table.string('description').nullable()
      table.string('gaming_system').nullable()
      // privacy is an enum with values: public, private, unlisted -> unlisted means it's not public but not private either (it's not searchable)
      table.string('privacy').notNullable().defaultTo('public')
      table.integer('owner_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('genre').nullable()
      table.string('tags').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
