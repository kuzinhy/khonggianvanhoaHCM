import React, { useState } from 'react';
import { 
  X, BarChart3, Users, Award, BookOpen, CheckSquare, 
  TrendingUp, Download, ShieldCheck, Filter, ArrowUpRight
} from 'lucide-react';
import { INITIAL_CHIBO_ANALYTICS, ChiBoAnalyticsRecord } from '../data/hcmAdvancedFeaturesData';

interface HcmHeritageAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HcmHeritageAnalyticsModal: React.FC<HcmHeritageAnalyticsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [data, setData] = useState<ChiBoAnalyticsRecord[]>(INITIAL_CHIBO_ANALYTICS);
  const [filterType, setFilterType] = useState<'all' | 'khu-pho' | 'co-quan'>('all');

  if (!isOpen) return null;

  const totalMembers = data.reduce((acc, curr) => acc + curr.totalPartyMembers, 0);
  const totalActive = data.reduce((acc, curr) => acc + curr.activeLearnersCount, 0);
  const totalQuizzes = data.reduce((acc, curr) => acc + curr.quizzesPassedCount, 0);
  const totalChallenges = data.reduce((acc, curr) => acc + curr.challengeCompletedCount, 0);
  const overallChallengePercent = Math.round((totalChallenges / totalMembers) * 100);

  const filteredData = data.filter(item => {
    if (filterType === 'khu-pho') return item.chiBoName.includes('Khu phố');
    if (filterType === 'co-quan') return !item.chiBoName.includes('Khu phố');
    return true;
  });

  const handleExportCSV = () => {
    const headers = [
      "Chi bộ [Dữ liệu minh họa]",
      "Tổng Đảng viên",
      "Đang học tập",
      "Đạt trắc nghiệm",
      "Hoàn thành 21 ngày",
      "Mức độ tham gia thử nghiệm"
    ];
    const rows = filteredData.map(d => [
      `"[Minh họa] ${d.chiBoName}"`,
      d.totalPartyMembers,
      d.activeLearnersCount,
      d.quizzesPassedCount,
      d.challengeCompletedCount,
      `"${d.rankBadge}"`
    ]);
    const noteRow = ["# GHI CHÚ: Tệp dữ liệu minh họa kỹ thuật phục vụ thử nghiệm giao diện. Không dùng làm căn cứ đánh giá xếp loại thực tế."];
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [noteRow.join(','), headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bao-cao-minh-hoa-hoc-tap-chi-bo-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col border-2 border-[#C59A55]/50 overflow-hidden font-sans">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#751D2C] via-[#8B2332] to-[#5C1420] text-white flex items-center justify-between border-b border-[#C59A55]/40 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E2B755] to-[#B3802B] p-0.5 shadow-md flex items-center justify-center text-[#751D2C]">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-400 text-slate-900 text-xs rounded-full font-extrabold uppercase tracking-wider border border-amber-300">
                  ⚠️ Dữ liệu minh họa
                </span>
                <span className="text-xs text-amber-100/90 font-medium">Kỳ báo cáo thử nghiệm: Quý I/2026 · Cập nhật: 24/11/2026</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-amber-100">
                Trung Tâm Thống Kê Học Tập Di Sản Hồ Chí Minh
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-amber-200 border border-amber-300/30 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Báo Cáo CSV (Bản minh họa)</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-full text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Dashboard Metrics Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 flex-shrink-0">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] text-slate-500 font-semibold uppercase flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#751D2C]" /> Tổng Đảng Viên
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-1">
              {totalMembers} <span className="text-xs font-normal text-emerald-600">({totalActive} active)</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] text-slate-500 font-semibold uppercase flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" /> Hoàn thành 21 ngày
            </div>
            <div className="text-2xl font-bold text-[#751D2C] mt-1">
              {overallChallengePercent}% <span className="text-xs font-normal text-slate-500">({totalChallenges} đ/c)</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] text-slate-500 font-semibold uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Bài Thi Trắc Nghiệm Đạt
            </div>
            <div className="text-2xl font-bold text-blue-700 mt-1">
              {totalQuizzes} <span className="text-xs font-normal text-slate-500">lượt nộp</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] text-slate-500 font-semibold uppercase flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#C59A55]" /> Số Chi Bộ Tham Gia
            </div>
            <div className="text-2xl font-bold text-amber-700 mt-1">
              {data.length} <span className="text-xs font-normal text-slate-500">chi bộ</span>
            </div>
          </div>
        </div>

        {/* Content Body & Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#C59A55]" /> Khối chi bộ:
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${filterType === 'all' ? 'bg-[#751D2C] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Tất cả ({data.length})
                </button>
                <button
                  onClick={() => setFilterType('khu-pho')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${filterType === 'khu-pho' ? 'bg-[#751D2C] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Khu phố
                </button>
                <button
                  onClick={() => setFilterType('co-quan')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${filterType === 'co-quan' ? 'bg-[#751D2C] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Lực lượng & Trường
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-1">
              <span>Số liệu cập nhật định kỳ từ hoạt động sinh hoạt cơ sở.</span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#751D2C] text-amber-100 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Tên Chi Bộ Trực Thuộc</th>
                    <th className="px-4 py-3 font-semibold text-center">Tổng Đảng Viên</th>
                    <th className="px-4 py-3 font-semibold text-center">Đang Tham Gia</th>
                    <th className="px-4 py-3 font-semibold text-center">Trắc Nghiệm Đạt</th>
                    <th className="px-4 py-3 font-semibold text-center">Hoàn Thành 21 Ngày</th>
                    <th className="px-4 py-3 font-semibold text-center">Điểm Trung Bình</th>
                    <th className="px-4 py-3 font-semibold text-center">Xếp Loại</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.map((row, idx) => {
                    const percent21 = Math.round((row.challengeCompletedCount / row.totalPartyMembers) * 100);
                    const isHigh = row.rankBadge === 'Xuất sắc';
                    const isMedium = row.rankBadge === 'Tốt';

                    return (
                      <tr key={row.chiBoId} className="hover:bg-amber-50/40 transition-colors">
                        <td className="px-4 py-3.5 font-bold text-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-semibold">
                              {idx + 1}
                            </span>
                            <span>{row.chiBoName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-center font-semibold text-slate-700">
                          {row.totalPartyMembers}
                        </td>
                        <td className="px-4 py-3.5 text-center font-semibold text-emerald-600">
                          {row.activeLearnersCount} ({Math.round(row.activeLearnersCount / row.totalPartyMembers * 100)}%)
                        </td>
                        <td className="px-4 py-3.5 text-center font-semibold text-blue-700">
                          {row.quizzesPassedCount}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${isHigh ? 'bg-emerald-600' : isMedium ? 'bg-amber-500' : 'bg-rose-500'}`}
                                style={{ width: `${percent21}%` }}
                              />
                            </div>
                            <span className="font-bold text-xs">{percent21}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-center font-mono font-bold text-amber-900">
                          {row.topLearningScore}/100
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            isHigh 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                              : isMedium 
                                ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {row.rankBadge}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Guidance note for Party leaders */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#751D2C] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#751D2C] uppercase tracking-wide">
                  Nguyên tắc thẩm định và quản lý số liệu:
                </span>
                <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-extrabold text-[10px]">
                  BẢN MÔ PHỎNG KỸ THUẬT
                </span>
              </div>
              <p className="leading-relaxed">
                Số liệu trên màn hình hiện là <strong>dữ liệu minh họa</strong> phục vụ việc thiết kế và thử nghiệm chức năng số hóa. Kết quả rèn luyện của từng tổ chức Đảng và đảng viên được đánh giá toàn diện qua chất lượng sinh hoạt chi bộ, tự phê bình và phê bình định kỳ theo Quy định số 144-QĐ/TW của Bộ Chính trị; không suy diễn thành tích hay xếp loại tổ chức chỉ từ số lượt truy cập hay điểm thi trắc nghiệm trực tuyến.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
