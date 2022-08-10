FROM rabbitmq:3.10.7-management-alpine

RUN apk add curl
RUN curl -L https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.10.2/rabbitmq_delayed_message_exchange-3.10.2.ez > $RABBITMQ_HOME/plugins/rabbitmq_delayed_message_exchange-3.10.2.ez
RUN chown rabbitmq:rabbitmq $RABBITMQ_HOME/plugins/rabbitmq_delayed_message_exchange-3.10.2.ez
RUN rabbitmq-plugins enable --offline rabbitmq_delayed_message_exchange
RUN rabbitmq-plugins enable --offline rabbitmq_consistent_hash_exchange

EXPOSE 5672
EXPOSE 15672
