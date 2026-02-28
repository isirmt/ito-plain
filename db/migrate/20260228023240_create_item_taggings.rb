class CreateItemTaggings < ActiveRecord::Migration[8.1]
  def change
    create_table :item_taggings do |t|
      t.references :item, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end

    add_index :item_taggings, [:item_id, :tag_id], unique: true
  end
end
