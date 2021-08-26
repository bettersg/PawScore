FROM node
COPY . /app


# TODO: Add frontend compile & copy

# END TODO


# Docs - Download Swagger

WORKDIR /app

RUN wget https://github.com/swagger-api/swagger-ui/archive/refs/tags/v3.52.0.zip
RUN unzip v3.52.0.zip swagger-ui-3.52.0/dist/* -d swagger
RUN mv swagger/swagger-ui-3.52.0/dist/ ./docs/swagger
RUN rm -rf ./swagger
RUN sed -i 's/https:\/\/petstore.swagger.io\/v2\/swagger.json/\/docs\/pawscore-swagger.yaml/g' docs/swagger/index.html

# Backend

WORKDIR /app/backend

RUN npm install backend
RUN npm run build
RUN npm run prestart

CMD node /app/backend
