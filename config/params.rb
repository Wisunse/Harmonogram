module Params
  # socket = Socket.gethostname.include?('kendel')
  socket = true
  if socket
    PG_HOST = 'database.tech.sp'
    PG_PORT = 5432
    PG_DB_NAME = 'marketing-magazyn'
    PG_USER = 'raporty.produkcji'
    PG_PASSWORD = 'raporty.produkcji'
  else
    PG_HOST = 'localhost'
    PG_PORT = 5432
    PG_DB_NAME = 'marketing_warehouse'
    PG_USER = 'zdalnie'
    PG_PASSWORD = 'zdalnie'
  end
end