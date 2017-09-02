class Users

  def self.all_users
    sql = {statement: 'SELECT id, login FROM accounts', values: []}
    result = Tools.sql_query(sql)

    { all_users: result.to_a }
  end

  def self.new_user(params)

    username = params[:login]
    password = params[:password]
    password_confirm = params[:password_confirm]
    email = params[:email]
    phone_number = params[:phone]

    if password == password_confirm

      sql = { statement: 'INSERT INTO users (username, password, email, phone_number) VALUES ($1, $2, $3, $4)',
              values: [username, password, email, phone_number] }
      sql_query(sql)

      '1'

    else

      '0'

    end

  end

  def self.edit_user(params)

    user_id = params[:id]
    password = params[:password]
    password_confirm = params[:password_confirm]
    email = params[:email]
    phone_number = params[:phone_number]

    if password != nil && password_confirm != nil && password == password_confirm

      sql = { statement: 'UPDATE accounts SET email = $1, phone_number = $2, password = $4 WHERE user_id = $5', values: [email, phone_number password, user_id] }
      sql_query(sql)
      '1'

    else

      sql = { statement: 'UPDATE accounts SET email = $1, phone_number = $2, a WHERE user_id = $4', values: [email, phone_number, user_id] }
      sql_query(sql)
      '1'

    end

  end

  def self.delete_user(params)

    user_id = params[:id]
    if user_id != 1
      sql = {statement: 'DELETE from accounts where id = $1', values: [user_id], json: true}
      sql_query(sql)
      '1'
    else
      '0'
    end

  end

end