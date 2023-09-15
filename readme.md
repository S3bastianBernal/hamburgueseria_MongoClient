## Diagnostico Hamburgueseria

# en este apartado comentare el proceso de construccion de cada enpoint

////////////////////////////////////////////////////////////////////////////////////////////////

# 1. Encontrar todos los ingredientes con stock menor a 400.

en este ejercicio haremos la peticion a la coleccion de ingredientes y le pondremos un $lt para limitar el stock maximo a 400 para que solo nos retorne de 400 para abajo 

# 2. Encontrar todas las hamburguesas de la categoría “Vegetariana”

en este endpoint haremos una consulta a la coleccion de hamburguesas usando la funcion find y le pondremos como filtro que nos retorne solo aquellas que tengan "Vegetariana" en su categoria 

# 3. Encontrar todos los chefs que se especializan en “Carnes”

en este endpoint haremos una consulta a la coleccion de chefs usando la funcion find y le pondremos como filtro que nos retorne solo aquellos que tengan "Carnes" en su especialidad 

# 4. Aumentar en 1.5 el precio de todos los ingredientes

en este endpoint haremos un update al cual le mandaremos el precio y con la funcion mul lo aumentaremos en 1.5 al valor original

# 5.Encontrar todas las hamburguesas preparadas por “ChefB”

en este endpoint haremos una consulta la cual buscara en las hamburgesas las que sean preparadas por ChefB usando en find y el filtro en especifico