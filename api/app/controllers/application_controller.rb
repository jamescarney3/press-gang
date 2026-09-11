class ApplicationController < ActionController::Base
  include Authentication
  include AccessControl
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  def root
    render plain: 'hello world'
  end
end
