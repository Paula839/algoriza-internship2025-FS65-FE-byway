import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { Bell } from "lucide-react";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import StarRating from "../../components/StarRating";
import InstructorModal from "../../components/Admin/InstructorModal";
import DeleteConfirmModal from "../../components/Admin/DeleteConfirmModal";
import { getInstructors } from "../../services/instructorsService";
import type { Instructor } from "../../types";
import { deleteInstructor } from "../../services/instructorsService"; 
import { searchPagination as searchInstructors } from "../../services/instructorsService";

const ITEMS_PER_PAGE = 8;

const InstructorsPage = () => {
  const { page } = useParams<{ page?: string }>();
  const navigate = useNavigate();

  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "view" | "edit">("add");
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState<Instructor | null>(null);

  const [totalInstructors, setTotalInstructors] = useState(0);

const fetchInstructors = async (pageNumber: number) => {
  try {
    if (search.trim()) setSearching(true);
    else setLoading(true);

    const result = search.trim()
      ? await searchInstructors(search, pageNumber, ITEMS_PER_PAGE)
      : await getInstructors(pageNumber, ITEMS_PER_PAGE);

    if (result) {
      setInstructors(result.items);
      setTotalPages(Math.ceil(result.totalCount / result.pageSize));
      setTotalInstructors(result.totalCount);
    } else {
      setInstructors([]);
      setTotalPages(1);
      setTotalInstructors(0);
    }
  } catch (err) {
    console.error("Failed to fetch instructors:", err);
  } finally {
    setLoading(false);
    setSearching(false);
  }
};

  useEffect(() => {
    let pageNumber = Number(page) || 1;
    if (pageNumber < 1 || isNaN(pageNumber)) {
      pageNumber = 1;
      navigate("/admin/instructors/1", { replace: true });
    }
    setCurrentPage(pageNumber);
    fetchInstructors(pageNumber);
  }, [page, navigate]);

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (search.trim()) {
      setSearching(true);
      fetchInstructors(1);
    } else {
      setLoading(true);
      fetchInstructors(1);
    }
  }, 400);

  return () => clearTimeout(delayDebounce);
}, [search]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    navigate(`/admin/instructors/${pageNumber}`);
  };

  const handlePrev = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      range.push(i);
    }
    if (range[0] > 1) range.unshift(1, -1);
    if (range[range.length - 1] < totalPages) range.push(-1, totalPages);
    return range;
  };

  const handleDeleteClick = (inst: Instructor) => {
    setInstructorToDelete(inst);
    setDeleteModalOpen(true);
  };

const confirmDeleteInstructor = async () => {
  if (instructorToDelete) {
    try {
      await deleteInstructor(instructorToDelete?.id ?? 0);
      setInstructors((prev) => prev.filter((i) => i.id !== instructorToDelete.id));
      await fetchInstructors(currentPage);
    } catch (err) {
      console.error("Failed to delete instructor:", err);
    }
  }
  setInstructorToDelete(null);
  setDeleteModalOpen(false);
};

  const openAddModal = () => {
    setModalMode("add");
    setSelectedInstructor(null);
    setModalOpen(true);
  };

  const openViewModal = (inst: Instructor) => {
    setModalMode("view");
    setSelectedInstructor(inst);
    setModalOpen(true);
  };

  const openEditModal = (inst: Instructor) => {
    setModalMode("edit");
    setSelectedInstructor(inst);
    setModalOpen(true);
  };


  return (
    <AdminLayout key={currentPage}>
      <div className="flex justify-between items-center w-full h-24 px-8 border-b border-gray-200">
        <h1 className="text-[28px] font-medium text-[#202637]">Instructors</h1>
        <div className="relative w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-full">
          <Bell className="w-6 h-6 text-[#96A0B6]" strokeWidth={2} />
          <span className="absolute top-2 right-3 w-2 h-2 bg-[#E45F5F] border border-white rounded-full"></span>
        </div>
      </div>

      <div className="flex justify-between items-center w-full px-8 mt-6">
        <div className="flex items-center gap-2">
          <h3 className="text-[24px] font-medium leading-[30px] text-[#202637]">Instructors</h3>
          <div className="flex justify-center items-center bg-[#EEF0F3] rounded-full px-3 py-1.5">
            <span className="text-[16px] font-medium text-[#7E8CA0]">{totalInstructors}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 w-[45%]">
          <button
            onClick={openAddModal}
            className="flex justify-center items-center w-[142px] h-[44px] bg-[#020617] rounded-[8px] text-white font-medium text-[14px] 
            hover:bg-[#11121B] active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            Add Instructor
          </button>

          <input
            type="text"
            placeholder="Search instructors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-[#F1F3F9] rounded-lg py-3 pl-4 text-sm text-[#626C83] focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            disabled={loading}
          />
        </div>
      </div>

      <div className="overflow-x-auto mt-6 px-8">
        <div className="min-w-full bg-white shadow rounded-lg">
          <div className="flex items-center bg-[#F1F5FF] rounded-t-lg px-6 py-4 gap-4">
            <div className="flex-1 font-semibold text-[14px] text-[#202637]">Name</div>
            <div className="flex-1 font-semibold text-[14px] text-[#202637]">Job title</div>
            <div className="flex-1 font-semibold text-[14px] text-[#202637]">Rate</div>
            <div className="flex-1 font-semibold text-[14px] text-[#202637] text-center">Action</div>
          </div>

      {loading || searching ? (
        <div className="px-6 py-4 text-gray-500">Loading instructors...</div>
      ) : instructors.length === 0 ? (
        <div className="px-6 py-4 text-gray-500">
          {search.trim() ? "No matching instructors found." : "No instructors found."}
        </div>
      ) : (
        instructors.map((inst) => (
              <div
                key={inst.id}
                className="flex items-center px-6 py-4 border-b border-gray-200 hover:bg-gray-50 gap-4"
              >
                <div className="flex-1">{inst.name}</div>
                <div className="flex-1">{inst.title}</div>
                <div className="flex-1">
                  <StarRating rating={inst.rate ?? 0 / 20} disabled />
                </div>
                <div className="flex-1 flex justify-center gap-3">
                  <button
                    className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 active:scale-95 transition-all shadow-sm"
                    onClick={() => openViewModal(inst)}
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-95 transition-all shadow-sm"
                    onClick={() => openEditModal(inst)}
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 transition-all shadow-sm"
                    onClick={() => handleDeleteClick(inst)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-center mt-6 bg-white shadow-sm rounded-md h-[41px] gap-1">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-[43px] border border-gray-300 rounded-l-md disabled:opacity-50"
          >
            <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
          </button>
          {getPageNumbers().map((pageNum, idx) =>
            pageNum === -1 ? (
              <span key={idx} className="px-2">...</span>
            ) : (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`w-[43px] h-[41px] flex items-center justify-center border border-gray-300 ${
                  currentPage === pageNum
                    ? "bg-blue-500 text-white font-semibold"
                    : "bg-white text-gray-700"
                }`}
              >
                {pageNum}
              </button>
            )
          )}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-[43px] border border-gray-300 rounded-r-md disabled:opacity-50"
          >
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <InstructorModal
        isOpen={modalOpen}
        mode={modalMode}
        instructor={selectedInstructor}
        onClose={() => setModalOpen(false)}
        onAdd={() => fetchInstructors(currentPage)}   
        onUpdate={() => fetchInstructors(currentPage)}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteInstructor}
        name={instructorToDelete?.name || ""}
      />
    </AdminLayout>
  );
};

export default InstructorsPage;
