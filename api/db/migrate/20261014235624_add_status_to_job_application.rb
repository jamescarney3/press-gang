class AddStatusToJobApplication < ActiveRecord::Migration[8.1]
  def change
    add_column :job_applications, :status, :integer, null: false, default: 0
  end
end
