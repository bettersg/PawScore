FROM node
COPY . /app

WORKDIR /app/backend

# TODO: Add frontend compile & copy

# END TODO


# Backend

RUN npm install backend
RUN npm run build
RUN npm run prestart

CMD node /app/backend
