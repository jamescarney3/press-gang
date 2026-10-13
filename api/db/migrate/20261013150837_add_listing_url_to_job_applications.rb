class AddListingUrlToJobApplications < ActiveRecord::Migration[8.1]
  def change
    add_column :job_applications, :listing_url, :string, null: false
    change_column_null :job_applications, :role_title, false
  end
end
