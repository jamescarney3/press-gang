class CreateQuestions < ActiveRecord::Migration[8.1]
  def change
    create_table :questions do |t|
      t.text :prompt
      t.text :answer
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :job_application, null: false, foreign_key: true

      t.timestamps
    end
  end
end
