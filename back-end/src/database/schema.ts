// src/db/schema.ts
 import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  timestamp, 
  boolean, 
  integer,
  jsonb,
  index,
  uniqueIndex,
  pgEnum,
  real,
            primaryKey
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================
// ENUMS
// ============================================

export const roleEnum = pgEnum('role', ['admin', 'user']);
export const planTypeEnum = pgEnum('plan_type', ['1_month', '6_months', '1_year', 'pro']);
export const notificationTypeEnum = pgEnum('notification_type', [
  'comment_reply',
  'qcm_activity',
  'comment_upvote',
  'comment_downvote',
  'team_invitation',
  'team_activity'
]);
export const reportTypeEnum = pgEnum('report_type', [
  'error',
  'inappropriate',
  'outdated',
  'duplicate',
  'other'
]);
export const answerStatusEnum = pgEnum('answer_status', ['correct', 'partial', 'incorrect']);

// ============================================
// USERS & AUTHENTICATION
// ============================================

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  profilePicture: text('profile_picture'),
  role: roleEnum('role').default('user').notNull(),
  planType: planTypeEnum('plan_type'),
  planExpiresAt: timestamp('plan_expires_at'),
  activationCodeId: uuid('activation_code_id'),
  competitiveModeEnabled: boolean('competitive_mode_enabled').default(true).notNull(),
  notificationsEnabled: boolean('notifications_enabled').default(true).notNull(),
  dailyGoal: integer('daily_goal').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex('users_email_idx').on(table.email),
}));

export const activationCodes = pgTable('activation_codes', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: varchar('code', { length: 100 }).notNull().unique(),
  planType: planTypeEnum('plan_type').notNull(),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').default(true).notNull(),
  usedBy: uuid('used_by'),
  usedAt: timestamp('used_at'),
  createdBy: uuid('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  codeIdx: uniqueIndex('activation_codes_code_idx').on(table.code),
}));

// ============================================
// CONTENT STRUCTURE
// ============================================

export const volets = pgTable('volets', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const modules = pgTable('modules', {
  id: uuid('id').defaultRandom().primaryKey(),
  voletId: uuid('volet_id').notNull().references(() => volets.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  textContent: text('text_content'),
  images: jsonb('images').$type<string[]>().default([]),
  videos: jsonb('videos').$type<string[]>().default([]),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  voletIdx: index('modules_volet_idx').on(table.voletId),
}));

export const lessons = pgTable('lessons', {
  id: uuid('id').defaultRandom().primaryKey(),
  moduleId: uuid('module_id').notNull().references(() => modules.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  theorySummary: text('theory_summary'),
  qcmSummary: text('qcm_summary'),
  textContent: text('text_content'),
  images: jsonb('images').$type<string[]>().default([]),
  videos: jsonb('videos').$type<string[]>().default([]),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  moduleIdx: index('lessons_module_idx').on(table.moduleId),
}));

export const qcms = pgTable('qcms', {
  id: uuid('id').defaultRandom().primaryKey(),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  questionText: text('question_text').notNull(),
  propositions: jsonb('propositions').$type<{id: string, text: string}[]>().notNull(),
  correctAnswers: jsonb('correct_answers').$type<string[]>().notNull(), // Array of proposition IDs
  explanation: text('explanation'),
  source: varchar('source', { length: 255 }),
  difficulty: integer('difficulty').default(1),
  order: integer('order').default(0).notNull(),
  isApproved: boolean('is_approved').default(true).notNull(),
  submittedBy: uuid('submitted_by'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  lessonIdx: index('qcms_lesson_idx').on(table.lessonId),
  sourceIdx: index('qcms_source_idx').on(table.source),
  approvedIdx: index('qcms_approved_idx').on(table.isApproved),
}));

// ============================================
// LAYERS & USER PROGRESS
// ============================================

export const layers = pgTable('layers', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  layerNumber: integer('layer_number').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
}, (table) => ({
  userLayerIdx: index('layers_user_layer_idx').on(table.userId, table.layerNumber),
  userActiveIdx: index('layers_user_active_idx').on(table.userId, table.isActive),
}));

export const userAnswers = pgTable('user_answers', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  qcmId: uuid('qcm_id').notNull().references(() => qcms.id, { onDelete: 'cascade' }),
  layerId: uuid('layer_id').notNull().references(() => layers.id, { onDelete: 'cascade' }),
  selectedAnswers: jsonb('selected_answers').$type<string[]>().notNull(),
  status: answerStatusEnum('status').notNull(),
  pointsEarned: real('points_earned').default(0).notNull(),
  answeredAt: timestamp('answered_at').defaultNow().notNull(),
}, (table) => ({
  userQcmLayerIdx: uniqueIndex('user_answers_user_qcm_layer_idx').on(table.userId, table.qcmId, table.layerId),
  userLayerIdx: index('user_answers_user_layer_idx').on(table.userId, table.layerId),
  qcmIdx: index('user_answers_qcm_idx').on(table.qcmId),
}));

export const layerStatistics = pgTable('layer_statistics', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  layerId: uuid('layer_id').notNull().references(() => layers.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').references(() => lessons.id, { onDelete: 'cascade' }),
  moduleId: uuid('module_id').references(() => modules.id, { onDelete: 'cascade' }),
  sourceFilter: varchar('source_filter', { length: 255 }),
  correctCount: integer('correct_count').default(0).notNull(),
  partialCount: integer('partial_count').default(0).notNull(),
  incorrectCount: integer('incorrect_count').default(0).notNull(),
  totalAnswered: integer('total_answered').default(0).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userLayerLessonIdx: index('layer_stats_user_layer_lesson_idx').on(table.userId, table.layerId, table.lessonId),
  userLayerModuleIdx: index('layer_stats_user_layer_module_idx').on(table.userId, table.layerId, table.moduleId),
}));

// ============================================
// USER ACTIVITY TRACKING
// ============================================

export const userActivityHistory = pgTable('user_activity_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').references(() => lessons.id, { onDelete: 'cascade' }),
  moduleId: uuid('module_id').references(() => modules.id, { onDelete: 'cascade' }),
  activityType: varchar('activity_type', { length: 50 }).notNull(), // 'lesson_visit', 'module_visit', 'qcm_answer'
  timestamp: timestamp('timestamp').defaultNow().notNull(),
}, (table) => ({
  userTimestampIdx: index('activity_history_user_timestamp_idx').on(table.userId, table.timestamp),
  lessonIdx: index('activity_history_lesson_idx').on(table.lessonId),
  moduleIdx: index('activity_history_module_idx').on(table.moduleId),
}));

// ============================================
// GAMIFICATION & RANKINGS
// ============================================

export const userPoints = pgTable('user_points', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: timestamp('date').notNull(),
  totalPoints: real('total_points').default(0).notNull(),
  questionsAnswered: integer('questions_answered').default(0).notNull(),
  correctAnswers: integer('correct_answers').default(0).notNull(),
  rankingPoints: real('ranking_points').default(0).notNull(),
}, (table) => ({
  userDateIdx: uniqueIndex('user_points_user_date_idx').on(table.userId, table.date),
  dateIdx: index('user_points_date_idx').on(table.date),
  rankingIdx: index('user_points_ranking_idx').on(table.rankingPoints),
}));

// ============================================
// PLAYLISTS & NOTES
// ============================================

export const playlists = pgTable('playlists', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  isDefault: boolean('is_default').default(false).notNull(), // for "Last Look", "Revision", etc.
  isPublic: boolean('is_public').default(false).notNull(),
  createdBy: uuid('created_by'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdx: index('playlists_user_idx').on(table.userId),
  defaultIdx: index('playlists_default_idx').on(table.isDefault),
}));

export const playlistQcms = pgTable('playlist_qcms', {
  playlistId: uuid('playlist_id').notNull().references(() => playlists.id, { onDelete: 'cascade' }),
  qcmId: uuid('qcm_id').notNull().references(() => qcms.id, { onDelete: 'cascade' }),
  addedAt: timestamp('added_at').defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.playlistId, table.qcmId] }),
  qcmIdx: index('playlist_qcms_qcm_idx').on(table.qcmId),
}));

export const notes = pgTable('notes', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  qcmId: uuid('qcm_id').notNull().references(() => qcms.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userQcmIdx: index('notes_user_qcm_idx').on(table.userId, table.qcmId),
}));

// ============================================
// COMMENTS & INTERACTIONS
// ============================================

export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  qcmId: uuid('qcm_id').notNull().references(() => qcms.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  parentCommentId: uuid('parent_comment_id'),
  content: text('content').notNull(),
  images: jsonb('images').$type<string[]>().default([]),
  upvotes: integer('upvotes').default(0).notNull(),
  downvotes: integer('downvotes').default(0).notNull(),
  isEdited: boolean('is_edited').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  qcmIdx: index('comments_qcm_idx').on(table.qcmId),
  userIdx: index('comments_user_idx').on(table.userId),
  parentIdx: index('comments_parent_idx').on(table.parentCommentId),
}));

export const commentVotes = pgTable('comment_votes', {
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  commentId: uuid('comment_id').notNull().references(() => comments.id, { onDelete: 'cascade' }),
  voteType: integer('vote_type').notNull(), // 1 for upvote, -1 for downvote
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.commentId] }),
}));

// ============================================
// REPORTS
// ============================================

export const reports = pgTable('reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  qcmId: uuid('qcm_id').notNull().references(() => qcms.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  reportType: reportTypeEnum('report_type').notNull(),
  description: text('description').notNull(),
  isResolved: boolean('is_resolved').default(false).notNull(),
  resolvedBy: uuid('resolved_by'),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  qcmIdx: index('reports_qcm_idx').on(table.qcmId),
  resolvedIdx: index('reports_resolved_idx').on(table.isResolved),
}));

// ============================================
// TEAMS & COLLABORATION
// ============================================

export const teams = pgTable('teams', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  createdBy: uuid('created_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const teamMembers = pgTable('team_members', {
  teamId: uuid('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 50 }).default('member').notNull(), // 'admin', 'member'
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.teamId, table.userId] }),
  userIdx: index('team_members_user_idx').on(table.userId),
}));

export const teamSharedContent = pgTable('team_shared_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  teamId: uuid('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  contentType: varchar('content_type', { length: 50 }).notNull(), // 'qcm', 'playlist', 'note'
  contentId: uuid('content_id').notNull(),
  sharedAt: timestamp('shared_at').defaultNow().notNull(),
}, (table) => ({
  teamIdx: index('team_shared_content_team_idx').on(table.teamId),
  contentIdx: index('team_shared_content_content_idx').on(table.contentType, table.contentId),
}));

// ============================================
// NOTIFICATIONS
// ============================================

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: notificationTypeEnum('type').notNull(),
  message: text('message').notNull(),
  targetType: varchar('target_type', { length: 50 }),
  targetId: uuid('target_id'),
  actorId: uuid('actor_id').references(() => users.id, { onDelete: 'set null' }),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userReadIdx: index('notifications_user_read_idx').on(table.userId, table.isRead),
  userCreatedIdx: index('notifications_user_created_idx').on(table.userId, table.createdAt),
}));

// ============================================
// CUSTOM EXAMS
// ============================================

export const customExams = pgTable('custom_exams', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  qcmIds: jsonb('qcm_ids').$type<string[]>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdx: index('custom_exams_user_idx').on(table.userId),
}));

// ============================================
// RELATIONS
// ============================================

export const usersRelations = relations(users, ({ many, one }) => ({
  layers: many(layers),
  userAnswers: many(userAnswers),
  playlists: many(playlists),
  notes: many(notes),
  comments: many(comments),
  reports: many(reports),
  teamMemberships: many(teamMembers),
  createdTeams: many(teams),
  notifications: many(notifications),
  activationCode: one(activationCodes, {
    fields: [users.activationCodeId],
    references: [activationCodes.id],
  }),
}));

export const voletsRelations = relations(volets, ({ many }) => ({
  modules: many(modules),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  volet: one(volets, {
    fields: [modules.voletId],
    references: [volets.id],
  }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, {
    fields: [lessons.moduleId],
    references: [modules.id],
  }),
  qcms: many(qcms),
}));

export const qcmsRelations = relations(qcms, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [qcms.lessonId],
    references: [lessons.id],
  }),
  userAnswers: many(userAnswers),
  comments: many(comments),
  reports: many(reports),
  notes: many(notes),
}));

export const layersRelations = relations(layers, ({ one, many }) => ({
  user: one(users, {
    fields: [layers.userId],
    references: [users.id],
  }),
  userAnswers: many(userAnswers),
  layerStatistics: many(layerStatistics),
}));

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  user: one(users, {
    fields: [playlists.userId],
    references: [users.id],
  }),
  playlistQcms: many(playlistQcms),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  qcm: one(qcms, {
    fields: [comments.qcmId],
    references: [qcms.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  parentComment: one(comments, {
    fields: [comments.parentCommentId],
    references: [comments.id],
  }),
  replies: many(comments),
  votes: many(commentVotes),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  creator: one(users, {
    fields: [teams.createdBy],
    references: [users.id],
  }),
  members: many(teamMembers),
  sharedContent: many(teamSharedContent),
}));