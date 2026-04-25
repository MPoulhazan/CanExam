import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Animated, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import Button from '../components/Button';
import questionsData from '../data/questions.json';
import { theme } from '../theme';
import { DefaultTheme } from 'styled-components';

type ThemeProps = { theme: DefaultTheme };
import { RootStackParamList, Question } from '../types';

type TrainingScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Training'
>;

const QUESTION_COUNT_OPTIONS = [5, 10, 20, 40] as const;
const DEFAULT_QUESTION_COUNT = 20;
const PASS_RATIO = 0.75;
const QUESTION_COUNT_STORAGE_KEY = 'preferred_training_question_count';

interface TrainingScreenProps {
    navigation: TrainingScreenNavigationProp;
}

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props: ThemeProps) => props.theme.colors.background};
    max-width: 800px;
    align-self: center;
    width: 100%;
`;

const Header = styled.View`
    flex-direction: row;
    align-items: center;
    padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
    padding-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

const HeaderTitle = styled.Text`
    color: ${(props: ThemeProps) => props.theme.colors.text};
    font-size: ${(props: ThemeProps) => props.theme.typography.h2.fontSize}px;
    font-weight: ${(props: ThemeProps) => props.theme.typography.h2.fontWeight};
    flex: 1;
`;

const SetupDescription = styled.Text`
    color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
    font-size: ${(props: ThemeProps) => props.theme.typography.body.fontSize}px;
    line-height: ${(props: ThemeProps) => props.theme.typography.body.lineHeight}px;
    margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

const OptionsGrid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

const QuestionCountOption = styled.TouchableOpacity<{
    selected: boolean;
    recommended?: boolean;
}>`
    width: 48%;
    background-color: ${(props: ThemeProps & { selected: boolean }) =>
        props.selected ? props.theme.colors.primary : props.theme.colors.surfaceLight};
    border: 2px solid
        ${(props: ThemeProps & { selected: boolean; recommended?: boolean }) =>
            props.selected
                ? props.theme.colors.primaryLight
                : props.recommended
                ? props.theme.colors.secondary
                : props.theme.colors.border};
    border-radius: ${(props: ThemeProps) => props.theme.borderRadius.lg}px;
    padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
    margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

const OptionHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

const OptionCount = styled.Text<{ selected: boolean }>`
    color: ${(props: ThemeProps & { selected: boolean }) =>
        props.selected ? '#FFFFFF' : props.theme.colors.text};
    font-size: ${(props: ThemeProps) => props.theme.typography.h3.fontSize}px;
    font-weight: ${(props: ThemeProps) => props.theme.typography.h3.fontWeight};
`;

const RecommendedBadge = styled.View`
    background-color: rgba(6, 182, 212, 0.18);
    padding: 4px 8px;
    border-radius: ${(props: ThemeProps) => props.theme.borderRadius.full}px;
`;

const RecommendedBadgeText = styled.Text`
    color: ${(props: ThemeProps) => props.theme.colors.secondary};
    font-size: 12px;
    font-weight: 700;
`;

const OptionLabel = styled.Text<{ selected: boolean }>`
    color: ${(props: ThemeProps & { selected: boolean }) =>
        props.selected ? 'rgba(255, 255, 255, 0.86)' : props.theme.colors.textSecondary};
    font-size: ${(props: ThemeProps) =>
        props.theme.typography.bodySmall.fontSize}px;
    line-height: ${(props: ThemeProps) =>
        props.theme.typography.bodySmall.lineHeight}px;
`;

const SetupNote = styled.Text`
    color: ${(props: ThemeProps) => props.theme.colors.textMuted};
    font-size: ${(props: ThemeProps) =>
        props.theme.typography.bodySmall.fontSize}pp;
    line-height: ${(props: ThemeProps) =>
        props.theme.typography.bodySmall.lineHeight}px;
    margin-bottom: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

const ProgressBar = styled.View`
    height: 4px;
    background-color: ${(props: ThemeProps) => props.theme.colors.surfaceLight};
    margin: ${(props: ThemeProps) => props.theme.spacing.lg}px;
    margin-top: 0;
    border-radius: ${(props: ThemeProps) => props.theme.borderRadius.full}px;
    overflow: hidden;
`;

const ScrollContainer = styled(ScrollView)`
    flex: 1;
`;

const Content = styled.View`
    padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
`;

const QuestionNumber = styled.Text`
    color: ${(props: ThemeProps) => props.theme.colors.textMuted};
    font-size: ${(props: ThemeProps) =>
        props.theme.typography.bodySmall.fontSize}px;
    margin-bottom: ${(props: ThemeProps) => props.theme.spacing.sm}px;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const QuestionText = styled(Text)`
    color: ${(props: ThemeProps) => props.theme.colors.text};
    font-size: ${(props: ThemeProps) => props.theme.typography.h3.fontSize}px;
    font-weight: ${(props: ThemeProps) => props.theme.typography.h3.fontWeight};
    line-height: ${(props: ThemeProps) =>
        props.theme.typography.h3.lineHeight}px;
    margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
`;

const OptionButton = styled.TouchableOpacity<{
    selected?: boolean;
    correct?: boolean;
    incorrect?: boolean;
}>`
    background-color: ${(
        props: {
            selected?: boolean;
            correct?: boolean;
            incorrect?: boolean;
        } & ThemeProps
    ) =>
        props.selected
            ? props.correct
                ? props.theme.colors.success
                : props.incorrect
                ? props.theme.colors.error
                : props.theme.colors.primary
            : props.theme.colors.surfaceLight};
    padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
    border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
    margin-bottom: ${(props: ThemeProps) => props.theme.spacing.md}px;
    border: 2px solid
        ${(
            props: {
                selected?: boolean;
                correct?: boolean;
                incorrect?: boolean;
            } & ThemeProps
        ) =>
            props.selected
                ? props.correct
                    ? props.theme.colors.success
                    : props.incorrect
                    ? props.theme.colors.error
                    : props.theme.colors.primary
                : props.theme.colors.border};
    flex-direction: row;
    align-items: center;
`;

const OptionText = styled.Text`
    color: ${(props: ThemeProps) => props.theme.colors.text};
    font-size: ${(props: ThemeProps) => props.theme.typography.body.fontSize}px;
    flex: 1;
`;

const ExplanationCard = styled(View)<{ correct?: boolean }>`
    background-color: ${(props: ThemeProps) => props.theme.colors.surfaceLight};
    border-radius: ${(props: ThemeProps) => props.theme.borderRadius.md}px;
    padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
    margin-top: ${(props: ThemeProps) => props.theme.spacing.md}px;
    border-left-width: 4px;
    border-left-color: ${(props: { correct?: boolean } & ThemeProps) =>
        props.correct ? props.theme.colors.success : props.theme.colors.error};
`;

const ExplanationTitle = styled.Text`
    color: ${(props: ThemeProps) => props.theme.colors.text};
    font-weight: 600;
    margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xs}px;
`;

const ExplanationText = styled.Text`
    color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
    font-size: ${(props: ThemeProps) =>
        props.theme.typography.bodySmall.fontSize}px;
    line-height: ${(props: ThemeProps) =>
        props.theme.typography.bodySmall.lineHeight}px;
`;

const ButtonContainer = styled.View`
    padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
    padding-top: ${(props: ThemeProps) => props.theme.spacing.md}px;
`;

const isValidQuestionCount = (
    value: number
): value is (typeof QUESTION_COUNT_OPTIONS)[number] =>
    QUESTION_COUNT_OPTIONS.includes(
        value as (typeof QUESTION_COUNT_OPTIONS)[number]
    );

const getRequiredCorrectAnswers = (totalQuestions: number) =>
    Math.ceil(totalQuestions * PASS_RATIO);

const TrainingScreen: React.FC<TrainingScreenProps> = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(
        DEFAULT_QUESTION_COUNT
    );
    const [preferencesLoaded, setPreferencesLoaded] = useState<boolean>(false);
    const [sessionStarted, setSessionStarted] = useState<boolean>(false);

    const progressAnim = useRef(new Animated.Value(0)).current;
    const explanationOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loadPreferredQuestionCount = async () => {
            try {
                const storedValue = await AsyncStorage.getItem(
                    QUESTION_COUNT_STORAGE_KEY
                );

                if (storedValue) {
                    const parsedValue = Number(storedValue);

                    if (isValidQuestionCount(parsedValue)) {
                        setSelectedQuestionCount(parsedValue);
                    }
                }
            } catch (error) {
                console.warn(
                    'Failed to load preferred training question count.',
                    error
                );
            } finally {
                setPreferencesLoaded(true);
            }
        };

        void loadPreferredQuestionCount();
    }, []);

    useEffect(() => {
        if (!preferencesLoaded) {
            return;
        }

        const savePreferredQuestionCount = async () => {
            try {
                await AsyncStorage.setItem(
                    QUESTION_COUNT_STORAGE_KEY,
                    String(selectedQuestionCount)
                );
            } catch (error) {
                console.warn(
                    'Failed to save preferred training question count.',
                    error
                );
            }
        };

        void savePreferredQuestionCount();
    }, [preferencesLoaded, selectedQuestionCount]);

    const buildSessionQuestions = (requestedQuestionCount: number) => {
        const shuffleArray = <T,>(arr: T[]): T[] => {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        };

        const normalized = (questionsData as Question[]).map((q) => {
            const optionCount = q.options.fr.length;
            const indices = Array.from({ length: optionCount }, (_, i) => i);
            const perm = shuffleArray(indices);

            const newOptionsFr = perm.map((i) => q.options.fr[i]);
            const newOptionsEn = perm.map((i) => q.options.en[i]);
            const newCorrect = perm.indexOf(q.correctAnswer);

            return {
                ...q,
                options: { fr: newOptionsFr, en: newOptionsEn },
                correctAnswer: newCorrect,
            } as Question;
        });

        const shuffledQuestions = shuffleArray(normalized);
        const sessionCount = Math.min(
            requestedQuestionCount,
            shuffledQuestions.length
        );

        return shuffledQuestions.slice(0, sessionCount);
    };

    useEffect(() => {
        if (sessionStarted && questions.length > 0) {
            Animated.spring(progressAnim, {
                toValue: (currentQuestion + 1) / questions.length,
                useNativeDriver: false,
            }).start();
        }
    }, [currentQuestion, progressAnim, questions.length, sessionStarted]);

    useEffect(() => {
        if (showExplanation) {
            Animated.spring(explanationOpacity, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        } else {
            explanationOpacity.setValue(0);
        }
    }, [showExplanation]);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const handleAnswerSelect = (index: number) => {
        if (showExplanation) return;
        setSelectedAnswer(index);
    };

    const handleStartSession = () => {
        const sessionQuestions = buildSessionQuestions(selectedQuestionCount);

        setQuestions(sessionQuestions);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        progressAnim.setValue(0);
        setSessionStarted(true);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        const question = questions[currentQuestion];
        const isCorrect = selectedAnswer === question.correctAnswer;

        if (isCorrect) {
            setScore(score + 1);
        }

        setShowExplanation(true);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            // End of quiz — final score already accumulated in `score`
            const finalScore = score;
            const total = questions.length;
            const passed = finalScore >= getRequiredCorrectAnswers(total);
            navigation.navigate('Result', { score: finalScore, total, passed });
        }
    };

    if (!preferencesLoaded) {
        return (
            <Container>
                <Header>
                    <HeaderTitle>{t('training.title')}</HeaderTitle>
                </Header>
                <Content>
                    <SetupNote>{t('common.loading')}</SetupNote>
                </Content>
            </Container>
        );
    }

    if (!sessionStarted) {
        const availableQuestions = (questionsData as Question[]).length;
        const sessionCount = Math.min(selectedQuestionCount, availableQuestions);
        const requiredCorrectAnswers = getRequiredCorrectAnswers(sessionCount);

        return (
            <Container>
                <Header>
                    <HeaderTitle>{t('training.title')}</HeaderTitle>
                </Header>

                <ScrollContainer>
                    <Content>
                        <Card delay={100}>
                            <QuestionText>
                                {t('training.setupTitle')}
                            </QuestionText>
                            <SetupDescription>
                                {t('training.setupDescription')}
                            </SetupDescription>

                            <OptionsGrid>
                                {QUESTION_COUNT_OPTIONS.map((count) => {
                                    const isSelected =
                                        selectedQuestionCount === count;

                                    return (
                                        <QuestionCountOption
                                            key={count}
                                            selected={isSelected}
                                            recommended={
                                                count === DEFAULT_QUESTION_COUNT
                                            }
                                            onPress={() =>
                                                setSelectedQuestionCount(count)
                                            }
                                            activeOpacity={0.9}
                                        >
                                            <OptionHeader>
                                                <OptionCount
                                                    selected={isSelected}
                                                >
                                                    {count}
                                                </OptionCount>
                                                {count ===
                                                    DEFAULT_QUESTION_COUNT && (
                                                    <RecommendedBadge>
                                                        <RecommendedBadgeText>
                                                            {t(
                                                                'training.recommended'
                                                            )}
                                                        </RecommendedBadgeText>
                                                    </RecommendedBadge>
                                                )}
                                            </OptionHeader>
                                            <OptionLabel
                                                selected={isSelected}
                                            >
                                                {t(
                                                    'training.questionCountLabel',
                                                    { count }
                                                )}
                                            </OptionLabel>
                                        </QuestionCountOption>
                                    );
                                })}
                            </OptionsGrid>

                            {sessionCount === 0 ? (
                                <SetupNote>
                                    {t('training.noQuestionsAvailable')}
                                </SetupNote>
                            ) : sessionCount < selectedQuestionCount ? (
                                <SetupNote>
                                    {t('training.availableQuestions', {
                                        count: sessionCount,
                                    })}
                                </SetupNote>
                            ) : (
                                <SetupNote>
                                    {t('training.passTarget', {
                                        count: requiredCorrectAnswers,
                                    })}
                                </SetupNote>
                            )}

                            <Button
                                onPress={handleStartSession}
                                disabled={sessionCount === 0}
                            >
                                {t('training.startSession')}
                            </Button>
                        </Card>
                    </Content>
                </ScrollContainer>
            </Container>
        );
    }

    const question = questions[currentQuestion];
    const lang = i18n.language as 'fr' | 'en';
    const isCorrect =
        selectedAnswer !== null && selectedAnswer === question.correctAnswer;

    return (
        <Container>
            <Header>
                <HeaderTitle>{t('training.title')}</HeaderTitle>
            </Header>

            <ProgressBar>
                <Animated.View
                    style={{
                        width: progressWidth,
                        height: '100%',
                        backgroundColor: theme.colors.primary,
                        borderRadius: 9999,
                    }}
                />
            </ProgressBar>

            <ScrollContainer>
                <Content>
                    <Card delay={100}>
                        <QuestionNumber>
                            {t('training.question')} {currentQuestion + 1}{' '}
                            {t('training.of')} {questions.length}
                        </QuestionNumber>
                        <QuestionText>{question.question[lang]}</QuestionText>

                        {question.options[lang].map((option, index) => (
                            <OptionButton
                                key={index}
                                selected={selectedAnswer === index}
                                correct={
                                    showExplanation &&
                                    index === question.correctAnswer
                                }
                                incorrect={
                                    showExplanation &&
                                    selectedAnswer === index &&
                                    !isCorrect
                                }
                                onPress={() => handleAnswerSelect(index)}
                                disabled={showExplanation}
                            >
                                <OptionText>{option}</OptionText>
                                {showExplanation &&
                                    index === question.correctAnswer && (
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={24}
                                            color={theme.colors.text}
                                        />
                                    )}
                                {showExplanation &&
                                    selectedAnswer === index &&
                                    !isCorrect && (
                                        <Ionicons
                                            name="close-circle"
                                            size={24}
                                            color={theme.colors.text}
                                        />
                                    )}
                            </OptionButton>
                        ))}

                        {showExplanation && (
                            <Animated.View
                                style={{
                                    opacity: explanationOpacity,
                                }}
                            >
                                <ExplanationCard correct={isCorrect}>
                                    <ExplanationTitle>
                                        {isCorrect
                                            ? t('training.correct')
                                            : t('training.incorrect')}
                                    </ExplanationTitle>
                                    <ExplanationText>
                                        {question.explanation[lang]}
                                    </ExplanationText>
                                </ExplanationCard>
                            </Animated.View>
                        )}
                    </Card>
                </Content>
            </ScrollContainer>

            <ButtonContainer>
                {!showExplanation ? (
                    <Button
                        onPress={handleSubmit}
                        disabled={selectedAnswer === null}
                    >
                        {t('training.submit')}
                    </Button>
                ) : (
                    <Button onPress={handleNext}>
                        {currentQuestion < questions.length - 1
                            ? t('training.next')
                            : t('training.viewResults')}
                    </Button>
                )}
            </ButtonContainer>
        </Container>
    );
};

export default TrainingScreen;
