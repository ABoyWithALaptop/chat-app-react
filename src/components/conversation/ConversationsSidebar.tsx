import {
	ConversationSidebarContainer,
	ConversationSidebarHeader,
	ConversationSidebarItem,
	ConversationSidebarStyle,
} from "../../utils/styles";
import { TbEdit } from "react-icons/tb";
import { FC, useState, useEffect, useContext } from "react";
import {
	CommonMessage,
	Conversation,
	Message,
	User,
} from "../../utils/types/types";
import styles from "./index.module.scss";
import { useNavigate, useParams } from "react-router";
import { CreateConversationModal } from "../modals/CreateConversationModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SocketContext } from "../../utils/context/SocketContext";
type Props = {
	conversations: Conversation[];
};

// * show the person receive message in the conversations (thats mean not you, the guy send message)
export const showDisplayUser = (conversation: Conversation, user: User) => {
	return conversation.creator.id !== user?.id
		? conversation.creator
		: conversation.recipient;
};

const TypingEffectComponent = () => {
	return (
		<div className={styles.typing}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};

export const ConversationsSidebar: FC<Props> = ({ conversations }) => {
	const navigate = useNavigate();
	const [showModel, setShowModel] = useState(false);
	const user = useSelector((state: RootState) => state.user.currentUser);
	const { id } = useParams();
	const [activeSidebar, setActiveSidebar] = useState<number | null>(
		id ? parseInt(id) : null
	);
	const socket = useContext(SocketContext);
	const [conversationTypingId, setConversationTypingId] = useState<
		number[] | null
	>(null);

	useEffect(() => {
		socket.on(
			"userType",
			(payload: { user: User[]; idNumber: number } | null) => {
				// console.log(`payload is ${{ ...payload }}`);
				if (payload?.user) {
					setConversationTypingId((prev) =>
						prev ? [...prev, payload.idNumber] : [payload.idNumber]
					);
				}
			}
		);
		socket.on("userNotTyping", (user: User[]) => {
			const userStillType = [...user];
			if (userStillType.length === 0) {
				setConversationTypingId(null);
			}
		});
		return () => {
			socket.off("userType");
			socket.off("userNotTyping");
		};
	}, [id]);

	const showShortMessage = (message: CommonMessage) => {
		return message.content.length > 33 ? (
			<>{message.content.slice(0, 33)}&hellip;</>
		) : (
			message.content
		);
	};

	return (
		<>
			{showModel && <CreateConversationModal setShowModel={setShowModel} />}
			<ConversationSidebarStyle>
				<ConversationSidebarHeader>
					<h1>Conversations</h1>
					<div onClick={() => setShowModel(!showModel)}>
						<TbEdit size={32} />
					</div>
				</ConversationSidebarHeader>
				<ConversationSidebarContainer>
					{conversations.map((conversation, index) => {
						const guess = showDisplayUser(conversation, user!);
						return (
							<ConversationSidebarItem
								onClick={() => {
									setActiveSidebar(conversation.id);
									navigate(`/conversations/${conversation.id}`);
								}}
								key={conversation.id}
								active={conversation.id == activeSidebar ? true : false}
							>
								<div className={styles.conversationAvatar}></div>
								<div className={styles.info}>
									<div className={styles.conversationName}>
										{" "}
										{`${guess.lastName}  ${guess.firstName}`}
									</div>
									{/* {TypingEffectComponent()} */}
									{conversationTypingId?.includes(conversation.id) ? (
										<span className={styles.conversationLastMessage}>
											{TypingEffectComponent()}
										</span>
									) : (
										<span className={styles.conversationLastMessage}>
											{conversation?.lastMessageSent?.author.id === user?.id
												? " You: "
												: ""}
											{conversation.lastMessageSent
												? showShortMessage(conversation.lastMessageSent)
												: ""}
										</span>
									)}
								</div>
							</ConversationSidebarItem>
						);
					})}
				</ConversationSidebarContainer>
			</ConversationSidebarStyle>
		</>
	);
};
