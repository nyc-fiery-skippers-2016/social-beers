post '/search' do
  @search_query = params[:search][:query]
  conditions = { term: 'brewery'}

  @results = yelp_client.search(@search_query, conditions).businesses

  if request.xhr?
    content_type :json
    @results.to_json
  end
end

post '/tweets' do
  name = params[ :name ].split( ' ' )
  search_tweets = client.user_search( params[:name] ).first

  if search_tweets != nil
    if request.xhr?
      content_type :json
      {screen_name: search_tweets.screen_name}.to_json
    end
  end
end
