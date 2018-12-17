class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ['Unable to log in with provided credentials.'], status: 401
    end
  end

  def destroy
    if current_user
      logout
      render json: {}
    else
      render json: {}, status: 404
    end
  end

  def info
    @user = User.find(params[:id])
    render 'api/users/info'
  end

end
