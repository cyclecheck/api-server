FROM node:10.16.0-stretch
LABEL author=jordond

COPY init.sh /
COPY start.sh /

RUN apt-get update -qq \
  && apt-get install -y jq \
  && mkdir /opt/app \
  && mkdir /data \
  && chmod +x /init.sh \
  && chmod +x /start.sh \
  && chown -R node:node /opt /init.sh /start.sh /data \
  && npm install -g pm2 \
  && pm2 install pm2-logrotate

USER node
WORKDIR /opt/app

EXPOSE 8000

ENV ENV_PATH=/data/cyclecheck.env
ENV NODE_DOCKER=true
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8000
ENV DATA_DIR=/data
VOLUME /data

ENTRYPOINT ["/start.sh"]