class Event {

	constructor() {
		this.topics = {};
		this.store = {};
	}

	subscribe(topic, listener) {
		//make sure there is a topic and listener
		if (!topic || !listener) {
			return;
		}

		//create the topic if not yet created

		if (Array.isArray(topic)) {
			topic.forEach((singleTopic) => {
				if (!this.topics[singleTopic]) {
					this.topics[singleTopic] = [];
				}
				this.topics[singleTopic].push(listener);
			});
		} else {
			if (!this.topics[topic]) {
				this.topics[topic] = [];
			}
			//add the listener to queue
			this.topics[topic].push(listener);
		}
	}

	publish(topic, ...arg) {
		//make sure the topic and listeners exist
		if (!this.topics[topic] || this.topics[topic].length < 1) {
			return;
		}

		//send the event to all listeners

		this.topics[topic].forEach(function (listener) {
			listener(...arg || []);
		});
	}
};

const event = new Event();

export default event;


