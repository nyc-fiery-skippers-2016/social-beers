get '/login' do
  if logged_in?
    redirect '/'
  else
    erb :'/user_auth/login'
  end
end

post '/login' do
  @user = User.find_by(username: params[:user][:username])

  if @user && @user.authenticate(params[:user][:password])
    session[:user_id] = @user.id
    redirect '/'
  else
    @error = "Email or password was incorrect. Please try again!"
    erb :'/user_auth/login'
  end
end

get '/logout' do
  session.clear
  redirect '/'
end
