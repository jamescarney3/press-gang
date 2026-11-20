class CreateRecruiters < ActiveRecord::Migration[8.1]
  def change
    create_table :recruiters do |t|
      t.string :first_name, null: false
      t.string :last_name
      t.string :linked_in_url
      t.string :email_address
      t.string :phone_number

      t.timestamps
    end

    add_reference :job_applications, :recruiter
  end
end
