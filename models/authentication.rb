class Authentication

  def self.authentication(params = {})

    if !params[:login].nil? && !params[:password].nil?

      sql = { statement: 'SELECT * FROM accounts where login = $1',
              values: [params[:login]] }
      result = Tools.sql_query(sql)

      if result.count == 1
        username = result[0]['login']

        sql = { statement: 'SELECT id FROM accounts where login = $1 AND password = $2',
                values: [username, params[:password]] }
        result = Tools.sql_query(sql)

        if result.count == 1
          result[0]['id']
        else
          '-2'
        end

      else
        '-2' # wrong login/pass
      end

    else
      '-1' # nil in login/pass
    end

  end

end