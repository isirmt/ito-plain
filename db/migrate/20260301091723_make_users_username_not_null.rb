class MakeUsersUsernameNotNull < ActiveRecord::Migration[8.1]
  def change
    change_column_null :users, :username, false
  end
end
