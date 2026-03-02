class RemoveJsFromItems < ActiveRecord::Migration[8.1]
  def change
    remove_column :items, :js, :text
  end
end
