import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	useColorScheme,
	useWindowDimensions,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STORAGE_KEY = "egg_tracker_data";

type EggItem = {
	id: number;
	crossed: boolean;
};

type StoredData = {
	count: number;
	eggs: EggItem[];
};

export default function App() {
	const theme = useColorScheme();
	const isDark = theme === "dark";
	const [count, setCount] = useState("");
	const [eggs, setEggs] = useState<EggItem[]>([]);

	const { width } = useWindowDimensions();

	const numColumns = Math.max(3, Math.floor((width - 32) / 80));

	useEffect(() => {
		loadData();
	}, []);

	const initialized = useRef(false);

	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;
			return;
		}

		saveData();
	}, [eggs]);

	const loadData = async () => {
		try {
			const stored = await AsyncStorage.getItem(STORAGE_KEY);

			if (!stored) return;

			const parsed: StoredData = JSON.parse(stored);

			setEggs(parsed.eggs);
			setCount(String(parsed.count ?? ""));
		} catch (error) {
			console.error(error);
		}
	};

	const saveData = async () => {
		try {
			await AsyncStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					count: eggs.length,
					eggs,
				}),
			);
		} catch (error) {
			console.error(error);
		}
	};

	const toggleEgg = async (id: number) => {
		await Haptics.selectionAsync();
		setEggs((prev) =>
			prev.map((egg) =>
				egg.id === id ? { ...egg, crossed: !egg.crossed } : egg,
			),
		);
	};

	const resetAll = () => {
		setEggs((prev) =>
			prev.map((egg) => ({
				...egg,
				crossed: false,
			})),
		);
	};

	const resetEgg = async (id: number) => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

		setEggs((prev) =>
			prev.map((egg) => (egg.id === id ? { ...egg, crossed: false } : egg)),
		);
	};

	const createGrid = async () => {
		const total = Number.parseInt(count);

		if (Number.isNaN(total) || total <= 0) {
			return;
		}

		await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

		const freshGrid: EggItem[] = Array.from({ length: total }, (_, index) => ({
			id: index,
			crossed: false,
		}));

		setEggs(freshGrid);
	};

	const completedCount = eggs?.filter((egg) => egg.crossed)?.length ?? 0;
	const remainingCount = (eggs?.length ?? 9) - completedCount;

	return (
		<SafeAreaView
			style={{
				...styles.container,
				backgroundColor: isDark ? "#121212" : "#fff",
			}}
		>
			<Stack.Screen options={{ headerShown: false }}></Stack.Screen>
			<Text style={{ ...styles.header, color: isDark ? "#fff" : "#000" }}>
				🥚 Egg Tracker
			</Text>

			<View style={styles.form}>
				<TextInput
					style={{ ...styles.input, color: isDark ? "#fff" : "#000" }}
					keyboardType="numeric"
					placeholder="Enter number of eggs"
					placeholderTextColor={isDark ? "#fff" : "#000"}
					value={count}
					onChangeText={setCount}
				/>

				<TouchableOpacity style={styles.button} onPress={createGrid}>
					<Text
						style={{ ...styles.buttonText, color: isDark ? "#fff" : "#000" }}
					>
						Create Grid
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.resetButton} onPress={resetAll}>
					<Text style={{ color: isDark ? "#fff" : "#000" }}>Reset All</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.stats}>
				<Text
					style={{
						color: isDark ? "#fff" : "#000",
					}}
				>
					🥚 Remaining: {remainingCount}
				</Text>

				<Text
					style={{
						color: isDark ? "#fff" : "#000",
					}}
				>
					✓ Completed: {completedCount}
				</Text>
			</View>

			<FlatList
				data={eggs}
				keyExtractor={(item) => item.id.toString()}
				numColumns={numColumns}
				contentContainerStyle={styles.grid}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={[
							styles.box,
							item.crossed && styles.crossedBox,
							{
								backgroundColor: isDark ? "#222" : "#fafafa",
							},
						]}
						onPress={() => toggleEgg(item.id)}
						onLongPress={() => resetEgg(item.id)}
					>
						<Text
							style={{
								fontSize: 30,
								opacity: item.crossed ? 0.3 : 1,
							}}
						>
							🥚
						</Text>

						{item.crossed && <Text style={styles.checkmark}>✓</Text>}
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16,
	},

	header: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 20,
		textAlign: "center",
	},

	form: {
		marginBottom: 20,
	},

	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 12,
		paddingHorizontal: 16,
		height: 50,
		marginBottom: 12,
	},

	button: {
		backgroundColor: "#2563eb",
		height: 50,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},

	buttonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},

	grid: {
		gap: 10,
	},

	box: {
		width: 70,
		height: 70,
		margin: 5,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#ddd",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fafafa",
	},

	crossedBox: {
		backgroundColor: "#f2f2f2",
	},

	emoji: {
		fontSize: 30,
	},

	stats: {
		marginBottom: 16,
		gap: 6,
	},

	resetButton: {
		height: 50,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#ddd",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},

	checkmark: {
		position: "absolute",
		top: 5,
		right: 8,
		fontSize: 18,
		fontWeight: "bold",
	},
});
