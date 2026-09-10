class AddSessionTokenToSession < ActiveRecord::Migration[8.1]
  def change
    add_column :sessions, :session_token, :string, null: false
    add_index :sessions, :session_token, unique: true
  end
end
