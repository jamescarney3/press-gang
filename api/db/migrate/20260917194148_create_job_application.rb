class CreateJobApplication < ActiveRecord::Migration[8.1]
  def change
    create_table :job_applications do |t|
      t.belongs_to :company, null: false, foreign_key: true
      t.string :role_title

      t.timestamps
    end
  end
end
