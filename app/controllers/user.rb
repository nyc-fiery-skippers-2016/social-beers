get '/users/new' do
  erb :'/users/new'
end

post '/users' do
  @user = User.new(username: params[:username], email: params[:email], password: params[:password])

  if @user.save
    session[:user_id] = @user.id
    redirect '/'
  else
    @errors = @user.errors.full_messages
    erb :'/users/new'
  end
end

get '/users/:id' do
  @user = User.find_by(id: params[:id])

  erb :'/users/show'
end

get '/users/:id/edit' do
  @user = User.find_by(id: params[:id])

  if logged_in? && @user.id == current_user.id
    erb :'/users/edit'
  else
    redirect '/'
  end
end

put '/users' do
  @user = User.find_by(id: params[:user_id])
  @user.assign_attributes(username: params[:username], email: params[:email])

  if @user.authenticate(params[:password]) && @user.update_attributes(username: params[:username], email: params[:email])
    redirect "/users/#{@user.id}"
  else
    @errors = ["Please be sure to fill in all information.", "Password may have been wrong, try again."]
    erb :'/users/edit'
  end
end

delete '/users' do
  @user = User.find_by(id: params[:user_id])

  @user.destroy

  redirect '/'
end