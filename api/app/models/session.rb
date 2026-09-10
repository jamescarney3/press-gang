class Session < ApplicationRecord
  belongs_to :user

  before_validation :ensure_session_token

  private
    def ensure_session_token
      self.session_token = SecureRandom.urlsafe_base64(32)
    end
end
