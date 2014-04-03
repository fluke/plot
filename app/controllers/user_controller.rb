class UserController < ApplicationController
	respond_to :json
	before_filter :authenticate_user!
	def current
		@user = User.find(current_user)
		render json: @user
	end
end
