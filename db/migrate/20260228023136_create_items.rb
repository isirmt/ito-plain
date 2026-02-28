class CreateItems < ActiveRecord::Migration[8.1]
  def change
    create_table :items do |t|
      t.string :slug, null: false
      t.string :title, null: false
      t.text :description
      t.text :html
      t.text :css
      t.text :js
      t.integer :status, null: false, default: 0

      t.timestamps
    end

    add_index :items, :slug, unique: true
  end
end
