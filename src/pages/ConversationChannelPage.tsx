import { MessagePanel } from "../components/messages/MessagePanel";
import { ConversationChannelPageStyle } from "../utils/styles";

export const ConversationChannelPage = () => {
	return (
		<ConversationChannelPageStyle>
			<MessagePanel></MessagePanel>
		</ConversationChannelPageStyle>
	);
};
